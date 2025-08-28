import Pet from '../models/Pet.mjs';
import Journal from '../models/Journal.mjs';

// @desc    Calculate and get wellness score for a pet
// @route   GET /api/wellness/:petId
// @access  Private
export const getWellnessScore = async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.findById(petId);
    if (!pet || pet.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // --- Wellness Score Calculation Logic ---
    let score = 50; // Base score

    // Bonus for being neutered
    if (pet.neutered) score += 10;

    // Bonus for recent check-ups
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const hasRecentCheckup = pet.healthTimeline.some(
      event => event.type === 'appointment' && new Date(event.date) > oneYearAgo
    );
    if (hasRecentCheckup) score += 15;

    // Analyze last 7 days of journal entries
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentJournals = await Journal.find({ pet: petId, date: { $gte: sevenDaysAgo } });

    if (recentJournals.length > 0) {
        const happyDays = recentJournals.filter(j => j.mood === 'happy' || j.mood === 'playful').length;
        const lethargicDays = recentJournals.filter(j => j.mood === 'lethargic').length;
        score += (happyDays * 2); // Bonus for happy days
        score -= (lethargicDays * 5); // Penalty for lethargic days
    } else {
        score -= 5; // Small penalty for no recent logs
    }
    
    // --- Radar Chart Data (Static for now, could be dynamic later) ---
    const chartData = [
      { subject: 'Nutrition', A: 85, fullMark: 100 },
      { subject: 'Activity', A: 70, fullMark: 100 },
      { subject: 'Vaccinations', A: 95, fullMark: 100 },
      { subject: 'Check-ups', A: hasRecentCheckup ? 90 : 40, fullMark: 100 },
      { subject: 'Mental Health', A: 75 + (happyDays * 2) - (lethargicDays * 5), fullMark: 100 },
    ];

    res.status(200).json({
      wellnessScore: Math.max(0, Math.min(100, Math.round(score))), // Clamp score between 0-100
      chartData,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
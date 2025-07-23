import os
import cv2

def extract_frames_from_videos(video_dir, output_dir, interval=30):
    os.makedirs(output_dir, exist_ok=True)
    for class_name in os.listdir(video_dir):
        class_path = os.path.join(video_dir, class_name)
        if not os.path.isdir(class_path):
            continue

        class_output = os.path.join(output_dir, class_name)
        os.makedirs(class_output, exist_ok=True)

        for video_file in os.listdir(class_path):
            video_path = os.path.join(class_path, video_file)
            cap = cv2.VideoCapture(video_path)
            count = 0
            frame_idx = 0
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                if frame_idx % interval == 0:
                    frame_file = f"{os.path.splitext(video_file)[0]}_frame{count}.jpg"
                    frame_path = os.path.join(class_output, frame_file)
                    cv2.imwrite(frame_path, frame)
                    count += 1
                frame_idx += 1
            cap.release()


if __name__ == "__main__":
    video_directory = "dataset/videos_train"
    output_directory = "dataset/frames_train"
    extract_frames_from_videos(video_directory, output_directory, interval=30)
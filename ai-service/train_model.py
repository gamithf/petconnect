import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import make_column_transformer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import pickle

# Read Data
data = pd.read_csv('Animal_Disease_dataset.csv')

# Features and target
x = data.drop(['Dangerous','Disease'], axis=1)
y = data['Disease']

# Train-test split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=1)

# OneHotEncoder
onehot = OneHotEncoder(handle_unknown='ignore')
onehot.fit(x[['AnimalName','symptoms1','symptoms2','symptoms3','symptoms4','symptoms5']])

# Column transformer
column_transformer = make_column_transformer(
    (OneHotEncoder(categories=onehot.categories_, handle_unknown='ignore'),
     ['AnimalName','symptoms1','symptoms2','symptoms3','symptoms4','symptoms5']),
    remainder='passthrough'
)

# Model pipeline
model = RandomForestClassifier()
pipe = make_pipeline(column_transformer, model)

# Train
pipe.fit(x_train, y_train)

# Evaluate
print("Train Accuracy:", pipe.score(x_train, y_train))
print("Test Accuracy:", pipe.score(x_test, y_test))

# Save locally with your environment version
pickle.dump(pipe, open('Random1_local.pkl', 'wb'))
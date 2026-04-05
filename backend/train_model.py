import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

# Dataset load (online)
url = "https://raw.githubusercontent.com/stedy/Machine-Learning-with-R-datasets/master/insurance.csv"
df = pd.read_csv(url)

# Encoding
le = LabelEncoder()
df['sex'] = le.fit_transform(df['sex'])
df['smoker'] = le.fit_transform(df['smoker'])
df['region'] = le.fit_transform(df['region'])

# Split
X = df.drop('charges', axis=1)
y = df['charges']

# Model train
model = RandomForestRegressor()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("Model created successfully!")
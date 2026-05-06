# utils.py

from xml.parsers.expat import model

from xml.parsers.expat import model

import numpy as np

# ---------------- PREDICTION FUNCTION ----------------
def make_prediction(model, assignment, attendance, study, stress):
    data = np.array([[assignment, assignment, attendance, study, stress]])
    return model.predict(data)[0]


# ---------------- SUGGESTION FUNCTION ----------------
def suggest(student):
    suggestions = []

    if student['StudyHours'] < 4:
        suggestions.append("Increase study hours")

    if student['Attendance_%'] < 75:
        suggestions.append("Improve attendance")

    if student['StressLevel'] > 7:
        suggestions.append("Reduce stress")

    return suggestions


# ---------------- PROMPT GENERATOR (for chatbot) ----------------
def generate_prompt(student):
    return f"""
    Student Data:
    Study Hours: {student['StudyHours']}
    Attendance: {student['Attendance_%']}
    Assignment: {student['AssignmentPercentage']}
    Stress: {student['StressLevel']}

    Explain performance and give suggestions.
    """
hasattr(model, "coef_")
def calculate_score(quiz, answers):
    """
    Calculate score by comparing user answers with correct answers.
    
    Args:
        quiz: List of question dicts with 'answer' and optionally 'correct_index'
        answers: List of user-selected indices (0-3)
    
    Returns:
        int: Number of correct answers
    """
    score = 0
    
    for i, question in enumerate(quiz):
        if i >= len(answers):
            break
        
        user_answer_index = answers[i]
        correct_index = question.get("correct_index", 0)
        
        if user_answer_index == correct_index:
            score += 1
    
    return score

#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    char text[250];
    int correct;
} Answer;

typedef struct
{
    char text[250];
    Answer *answers;
    char explanation[500];
    int size;
} Question;

typedef struct
{
    long id;
    Question *questions;
    int num_quest;
} Quiz;

Question *newQuestionList(int size);

Quiz newQuiz(int questions)
{
    Quiz q = {
        1,
        malloc(sizeof(Question) * questions),
        questions};
    return q;
}

int main()
{
    Answer *answers1 = (Answer *)malloc(sizeof(Answer) * 4);

    Answer a1 = {"Answer 1", 0};
    Answer a2 = {"Answer 2", 0};
    Answer a3 = {"Answer 3", 1};
    Answer a4 = {"Answer 4", 0};

    answers1[0] = a1;
    answers1[1] = a2;
    answers1[2] = a3;
    answers1[3] = a4;

    Question q1 = {"Question 1", answers1, "It is because of this and that 1"};
    Question q2 = {"Question 2", answers1, "It is because of this and that 2"};

    Quiz quiz = newQuiz(2);

    quiz.questions[0] = q1;
    quiz.questions[1] = q2;

    for (int i = 0; i < quiz.num_quest; i++)
    {
        printf("%s\n", quiz.questions[i].text);
    }

    return 0;
}
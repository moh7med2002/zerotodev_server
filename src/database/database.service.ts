import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Article } from 'src/modules/article/article.entity';
import { ArticleView } from 'src/modules/article_view/article_view.entity';
import { Category } from 'src/modules/category/category.entity';
import { Comment } from 'src/modules/comment/comment.entity';
import { Question } from 'src/modules/question/question.entity';
import { QuestionView } from 'src/modules/question_view/question_view.entity';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { QuizAnswer } from 'src/modules/quiz_answer/quiz_answer.entity';
import { QuizQuestion } from 'src/modules/quiz_question/quiz_question.entity';
import { RequestedQuestion } from 'src/modules/rquested_question/requested_question.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserPoint } from 'src/modules/user_point/user_point.entity';
import { UserQuiz } from 'src/modules/user_quiz/user_quiz.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '2838293yo',
        // password: '059283805928388',
        database: 'zerotodev_db',
      });
      sequelize.addModels([
        User,
        Admin,
        Article,
        ArticleView,
        Category,
        Comment,
        Question,
        QuestionView,
        Quiz,
        QuizAnswer,
        QuizQuestion,
        RequestedQuestion,
        UserPoint,
        UserQuiz,
      ]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];

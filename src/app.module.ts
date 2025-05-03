import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { QuestionModule } from './modules/question/question.module';
import { RquestedQuestionModule } from './modules/rquested_question/rquested_question.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuizQuestionModule } from './modules/quiz_question/quiz_question.module';
import { QuizAnswerModule } from './modules/quiz_answer/quiz_answer.module';
import { UserQuizModule } from './modules/user_quiz/user_quiz.module';
import { UserPointModule } from './modules/user_point/user_point.module';
import { QuestionViewModule } from './modules/question_view/question_view.module';
import { ArticleViewModule } from './modules/article_view/article_view.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
    imports: [
        JwtModule.register({ global: true, secret: 'token' }),
        DatabaseModule,
        UserModule,
        AdminModule,
        CategoryModule,
        ArticleModule,
        QuestionModule,
        RquestedQuestionModule,
        QuizModule,
        QuizQuestionModule,
        QuizAnswerModule,
        UserQuizModule,
        CommentModule,
        ArticleViewModule,
        QuestionViewModule,
        UserPointModule,
    ]
})
export class AppModule {}
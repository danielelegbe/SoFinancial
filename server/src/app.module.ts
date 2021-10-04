import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ForumModule } from './forum/forum.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { databaseModule } from './__test__/database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: false,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    PostsModule,
    ForumModule,
    CommentsModule,
    MessagesModule,
    databaseModule
  ],
  providers: [],
})
export class AppModule {}

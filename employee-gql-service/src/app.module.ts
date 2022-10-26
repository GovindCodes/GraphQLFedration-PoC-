import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Project } from './employee/entity/project.entity';
import { Location } from 'graphql';

@Module({
  imports: [
    EmployeeModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Project, Location], // saying: these are my server but i dont maintain this it is maintained by someone else
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ucp',
      password: 'ucp_local',
      database: 'employee-fed-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/src/db/migrations.js'],
      cli: { migrationsDir: 'src/db/migrations' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

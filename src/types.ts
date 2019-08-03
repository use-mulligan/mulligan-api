import { Prisma, Golfer, Course } from "./generated/prisma-client";

export interface IDModel {
  id: string;
}

export interface Context {
  prisma: Prisma;
  request: any;
}

export interface NewScorecardModel {
  golfers: [Golfer];
  course: Course;
}

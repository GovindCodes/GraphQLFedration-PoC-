import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";

@ObjectType()
@Directive('@extends') // Saying: i am not mainting this this is going to extend from somewhere else
@Directive('@key(fields: "id")')
export class Project {

    @Field((type) => ID)
    @Directive('@external') // saying: ot is not maintaned by us its an external entity
    id: string

    @Field((type) => [Employee])
    employees: Employee[]

}
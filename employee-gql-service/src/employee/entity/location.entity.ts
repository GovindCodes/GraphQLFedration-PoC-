import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { EmployeeService } from "../employee.service";
import { Employee } from "./employee.entity";

@ObjectType()
@Directive('@extends') // Saying: i am not mainting this this is going to extend from somewhere else
@Directive('@key(fields: "id")')
export class Location {

    @Field((type) => ID)
    @Directive('@external')
    id: string

    // project has many employee
    @Field((type) => [Employee])
    employees: Employee[]

}
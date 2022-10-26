import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from './entity/project.entity';

@Resolver((of) => Project) // resolver of project
export class ProjectResolver {

  // in my graphql server i have projectType so i created that and project type has something 
  // called employees and graphql doesnt knows how to resolve this
  constructor(private readonly employeeService: EmployeeService) {}

//  we want to resolve employee so we make sure it has the same name as in entity
  @ResolveField((of) => [Employee])
  employees(@Parent() project: Project): Promise<Employee[]> {
    console.log('resolving employees', project.id);
    return this.employeeService.forProject(project.id);
  }
}

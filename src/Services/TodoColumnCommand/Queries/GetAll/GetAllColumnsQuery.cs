using System.Collections.Generic;
using MediatR;
using Services.DtoModels.TodoColumnDto;

namespace Services.TodoColumnCommand.Queries.GetAll
{
    public class GetAllColumnsQuery: IRequest<List<TodoColumnDto>>
    {
    }
}
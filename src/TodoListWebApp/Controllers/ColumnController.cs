using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.TodoColumnCommand.Commands.CreateColumn;
using Services.TodoColumnCommand.DeleteColumnById;
using Services.TodoColumnCommand.Queries.GetAll;
using Services.TodoColumnCommand.Queries.GetColumnById;
using Services.TodoColumnCommand.Queries.GetColumnCount;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/column")]
    [Authorize]
    public class ColumnController: Controller
    {
        private readonly IMediator _mediator;

        public ColumnController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpPost]
        public async Task<long> CreateColumn(CreateColumnCommand column)
        {
            return await _mediator.Send(column);
        }
        
        // [HttpGet]
        // public async Task<int> GetColumnCount()
        // {
        //     return await _mediator.Send(new GetColumnCountQuery());
        // }
        
        // [HttpGet("{columnId:long}")]
        // public async Task<IActionResult> GetColumn(long columnId)
        // {
        //     return Ok(await _mediator.Send(new GetColumnByIdQuery(columnId)));
        // }
        //
        
        [HttpGet]
        public async Task<IActionResult> GetAllColumns()
        {
            return Ok(await _mediator.Send(new GetAllColumnsQuery()));
        }
        
        [HttpDelete("{columnId:long}")]
        public async Task<IActionResult> DeleteColumnById(long columnId)
        {
            return Ok(await _mediator.Send(new DeleteColumnByIdCommand(columnId)));
        }
       
    }
}
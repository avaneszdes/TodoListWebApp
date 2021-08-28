using AutoMapper;
using Entities;
using Services.DtoModels.TodoItemDto;
using Services.DtoModels.UsersDto;
using Services.TodoListServiceCommands.Commands.AddItem;

namespace Services
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<TodoItem, AddTodoItemCommand>()
                .ForMember(dest => dest.CreatedDate,
                    opt => opt.MapFrom(x => x.CreatedDate))
                .ForMember(dest => dest.Text,
                    opt => opt.MapFrom(x => x.Text))
                .ForMember(dest => dest.IsComplete
                    , opt => opt.MapFrom(x => x.IsComplete))
                .ForMember(dest => dest.Id
                    , opt => opt.MapFrom(x => x.Id));

            CreateMap<User, UserDtoModel>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(x => x.Id))
                .ForMember(dest => dest.Email,
                    opt => opt.MapFrom(x => x.Email))
                .ForMember(dest => dest.FirstName,
                    opt => opt.MapFrom(x => x.FirstName))
                .ForMember(dest => dest.LastName,
                    opt => opt.MapFrom(x => x.LastName))
                .ForMember(dest => dest.Role,
                    opt => opt.MapFrom(x => x.Role.Name))
                .ForMember(dest => dest.TodosCount,
                    opt => opt.MapFrom(x => x.TodoColumns.Count))
                .ForMember(dest => dest.Photo,
                    opt => opt.MapFrom(x => x.Photo));

            CreateMap<UserDtoModel, User>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(x => x.Id))
                .ForMember(dest => dest.Email,
                    opt => opt.MapFrom(x => x.Email))
                .ForMember(dest => dest.Password,
                    opt => opt.MapFrom(x => x.Password))
                .ForMember(dest => dest.FirstName,
                    opt => opt.MapFrom(x => x.FirstName))
                .ForMember(dest => dest.LastName,
                    opt => opt.MapFrom(x => x.LastName))
                .ForMember(dest => dest.Photo,
                    opt => opt.MapFrom(x => x.Photo));


            CreateMap<TodoItem, TodoItemDtoModel>()
                .ForMember(dest => dest.Text,
                    opt => opt.MapFrom(x => x.Text))
                .ForMember(dest => dest.IsComplete
                    , opt => opt.MapFrom(x => x.IsComplete))
                .ForMember(dest => dest.Id
                    , opt => opt.MapFrom(x => x.Id))
                .ForMember(dist => dist.CreatedDate, opt => opt.MapFrom(x => x.CreatedDate));
        }
    }
}
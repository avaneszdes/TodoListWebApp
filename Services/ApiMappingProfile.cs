using AutoMapper;
using Entities;
using Services.TodoItemDto;
using Services.UsersDto;

namespace TodoListWebApp
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<TodoItem, TodoItemDtoModel>()
                .ForMember(dest => dest.Text,
                    opt => opt.MapFrom(x => x.Text))
                .ForMember(dest => dest.IsComplete
                    ,opt => opt.MapFrom(x => x.IsComplete))
                .ForMember(dest => dest.Id
                    ,opt => opt.MapFrom(x => x.Id));

            CreateMap<User, UserDtoModel>()
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
                .ForMember(dest => dest.Role,
                    opt => opt.MapFrom(x => x.Role))
                .ForMember(dest => dest.TodosCount,
                    opt => opt.MapFrom(x => x.TodoItems.Count));



        }
    }
}
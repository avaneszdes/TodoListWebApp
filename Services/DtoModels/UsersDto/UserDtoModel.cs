namespace Services.UsersDto
{
    public class UserDtoModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int TodosCount { get; set; }
        public string Photo { get; set; }
        
        
    }
}
using System;

namespace Entities
{
    public class EmailConfirmData
    {
        public int Id { get; set; }
        public Guid GuidId { get; set; }
        public string Email { get; set; }
    }
}
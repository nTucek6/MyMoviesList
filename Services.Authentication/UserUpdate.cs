using Microsoft.AspNetCore.Http;

namespace Services.Authentication
{
    public class UserUpdate
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Bio { get; set; }
        public string? Password { get; set; }
        public IFormFile? UserImageData { get; set; }


    }
}

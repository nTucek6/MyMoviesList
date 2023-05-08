using Entities.Enum;

namespace Entities
{
    public class UsersEntity
    {
        public int Id {get;set;}
        public string Email {get;set;}
        public string PasswordHash {get;set;}
        public string Username {get;set;}
        public RolesEnum RoleId {get;set;}
        public string? ProfileImageData {get;set;}
        public string? UserBio { get;set;}
        public DateTime Joined {get;set;}

    }
}

namespace Services.Authentication
{
    public interface IAuthenticationService
    {
      Task<string> Register(Register user);
      Task<string> Login(User user);
      //Task<string> ValidateToken(string token);
      //Task<string> GetRole(string token);
      Task ChangePassword(UserUpdate user);
      Task <string> ChangeEmail(UserUpdate user);
      Task <string> ChangeUsername(UserUpdate user);
      Task ChangeBio(UserUpdate user);
      Task ChangeProfileImage(UserUpdate user);

    }
}

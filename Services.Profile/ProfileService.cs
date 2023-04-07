using DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Services.Profile
{
    public class ProfileService : IProfileService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public ProfileService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<string> GetUserBio(int Id)
        {
            var userBio = await myMoviesListContext.Users.Where(u => u.Id == Id).SingleOrDefaultAsync();

            if(userBio.UserBio != null)
            {
                return userBio.UserBio;
            }
            else
            {
                return null;
            }

        }
    }
}

using Azure;
using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.Extensions;
using System.Data;
using System.Linq.Expressions;

namespace Services.UsersAdmin
{
  
    public class UsersAdminService : IUsersAdminService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public UsersAdminService(MyMoviesListContext _myMoviesListContext)
        {
            myMoviesListContext = _myMoviesListContext;
        }

        public async Task<List<Users>> GetUsers(int PostPerPage, int Page, string? Search)
        {
             Expression<Func<UsersEntity, bool>> predicate = x => true;

            if (!String.IsNullOrEmpty(Search))
            {
                 predicate = x => x.Username.Contains(Search);
            }

            var users = await myMoviesListContext.Users
                    .Where(predicate)
                    .Where(u => u.RoleId != RolesEnum.Admin)
                    .OrderBy(t => t.Email)
                    .Select(x => new Users
                    {
                        Id = x.Id,
                        Email = x.Email,
                        Username = x.Username,
                        Role = ((RolesEnum)x.RoleId).ToString()
                    })
                    .Skip((Page - 1) * PostPerPage)
                    .Take(PostPerPage).ToListAsync();


            return users;
        }

        public async Task<int> GetUsersCount()
        {
            var count = await myMoviesListContext.Users.Where(u=> u.RoleId != RolesEnum.Admin).CountAsync();

            return count;
        }

        public async Task<List<UserRole>> GetUserRoles()
        {
            var roles = Enum.GetValues(typeof(RolesEnum)).Cast<RolesEnum>().ToList().Where(u => u != RolesEnum.Admin).Select(x => new UserRole { Id = x, RoleName = x.ToString() }).ToList();

            return roles;
        }

        public async Task ChangeUserRole(int UserId, int RoleId)
        {
            var user = await myMoviesListContext.Users.Where(q => q.Id == UserId).FirstOrDefaultAsync();

            if (user != null)
            {
                user.RoleId = (RolesEnum)RoleId;
                await myMoviesListContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("No user found");
            }


        }


    }
}

using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.EntityFrameworkCore;
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


    }
}

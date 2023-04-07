using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UsersAdmin
{
    public interface IUsersAdminService
    {
        Task<List<Users>> GetUsers(int PostPerPage, int Page, string? Search);
        Task<int> GetUsersCount();
    }
}

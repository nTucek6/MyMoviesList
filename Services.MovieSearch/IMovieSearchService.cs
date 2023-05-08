using Services.MoviesAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MovieSearch
{
    public interface IMovieSearchService
    {

        Task<List<Movies>> GetMoviesByGenre(int genre);
        Task<Movies> GetMovieInfo(int movieId);



    }
}

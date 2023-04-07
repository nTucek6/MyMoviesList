using Services.MoviesAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MovieSearch
{
    public class MovieSearchService : IMovieSearchService
    {
        public Task<List<Movies>> GetMoviesByGenre()
        {
            throw new NotImplementedException();
        }
    }
}

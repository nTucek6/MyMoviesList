using System.ComponentModel;

namespace Entities.Enum
{
    public enum GenresEnum
    {
        Action = 1,
        Adventure = 2,
        Comedy = 3,
        Drama = 4,
        Fantasy = 5,
        Horror = 6,
        Romance = 7,
        Western = 8,
        Thriller = 9,
        Animation = 10,
        Historical = 11,
        [Description("Science fiction")]
        ScienceFiction = 12,
        Musical = 13,
        Mystery = 14,
    }
}

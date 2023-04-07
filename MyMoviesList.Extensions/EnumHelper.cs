using System;
using System.ComponentModel;

namespace MyMoviesList.EnumExtension

{
    public static class EnumHelper
    {
        /*    public static string Description(this GenresEnum enumValue)
            {
                var genresEnum = enumValue.GetType()
                    .GetField(enumValue.ToString());


               var description = genresEnum.GetCustomAttributes(false)
                    .SingleOrDefault(attr => attr.GetType() == typeof(DescriptionAttribute)) as DescriptionAttribute;

                //  return genresEnum?.Description ?? "";

                return String.IsNullOrEmpty(description?.Description) ? genresEnum.ToString() : description?.Description;

            } */

        public static string GetDescription<T>(this T enumValue)
          where T : struct, IConvertible
        {
            if (!typeof(T).IsEnum)
                return null;

            var description = enumValue.ToString();
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            if (fieldInfo != null)
            {
                var attrs = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), true);
                if (attrs != null && attrs.Length > 0)
                {
                    description = ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return description;
        }



    }

}


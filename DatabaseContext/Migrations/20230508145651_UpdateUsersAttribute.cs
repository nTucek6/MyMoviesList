using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseContext.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUsersAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfileImageURL",
                table: "Users",
                newName: "ProfileImageData");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfileImageData",
                table: "Users",
                newName: "ProfileImageURL");
        }
    }
}

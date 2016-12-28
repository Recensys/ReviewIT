using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RecensysCoreRepository.Migrations
{
    public partial class adal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserStudyRelations_StudyId",
                table: "UserStudyRelations");

            migrationBuilder.DropIndex(
                name: "IX_UserStageRelation_StageId",
                table: "UserStageRelation");

            migrationBuilder.DropIndex(
                name: "IX_StageFieldRelations_FieldId",
                table: "StageFieldRelations");

            migrationBuilder.DropColumn(
                name: "CriteriaResultId2",
                table: "Articles");

            migrationBuilder.AddColumn<string>(
                name: "NameWithIdentifyProvider",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameWithIdentifyProvider",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "CriteriaResultId2",
                table: "Articles",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserStudyRelations_StudyId",
                table: "UserStudyRelations",
                column: "StudyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserStageRelation_StageId",
                table: "UserStageRelation",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_StageFieldRelations_FieldId",
                table: "StageFieldRelations",
                column: "FieldId");
        }
    }
}

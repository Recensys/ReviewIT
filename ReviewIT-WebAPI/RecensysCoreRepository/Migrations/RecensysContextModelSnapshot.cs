using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using RecensysCoreRepository.EFRepository;

namespace RecensysCoreRepository.Migrations
{
    [DbContext(typeof(RecensysContext))]
    partial class RecensysContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CriteriaResultId2");

                    b.Property<int>("StudyId");

                    b.HasKey("Id");

                    b.HasIndex("StudyId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Criteria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FieldId");

                    b.Property<string>("Operator");

                    b.Property<int>("StudyId");

                    b.Property<int>("Type");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("FieldId");

                    b.HasIndex("StudyId");

                    b.ToTable("Criterias");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.CriteriaResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ArticleId");

                    b.Property<int>("CriteriaId");

                    b.Property<int>("StageId");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId")
                        .IsUnique();

                    b.HasIndex("CriteriaId");

                    b.HasIndex("StageId");

                    b.ToTable("CriteriaResults");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Data", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ArticleId");

                    b.Property<int>("FieldId");

                    b.Property<int?>("TaskId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("FieldId");

                    b.HasIndex("TaskId");

                    b.ToTable("Data");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Field", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DataType");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("StudyId");

                    b.HasKey("Id");

                    b.HasIndex("StudyId");

                    b.ToTable("Fields");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Stage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<bool>("StageInitiated");

                    b.Property<int>("StudyId");

                    b.HasKey("Id");

                    b.HasIndex("StudyId");

                    b.ToTable("Stages");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.StageFieldRelation", b =>
                {
                    b.Property<int>("FieldId");

                    b.Property<int>("FieldType");

                    b.Property<int>("StageId");

                    b.HasKey("FieldId", "FieldType", "StageId");

                    b.HasIndex("FieldId");

                    b.HasIndex("StageId");

                    b.ToTable("StageFieldRelations");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.StageRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("StageRoles");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Strategy", b =>
                {
                    b.Property<int>("Id");

                    b.Property<int>("StrategyType");

                    b.Property<int>("StageId");

                    b.Property<string>("Value");

                    b.HasKey("Id", "StrategyType", "StageId");

                    b.HasIndex("StageId");

                    b.ToTable("Strategies");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Study", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Studies");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ArticleId");

                    b.Property<int>("StageId");

                    b.Property<int>("TaskState");

                    b.Property<int>("TaskType");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("StageId");

                    b.HasIndex("UserId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.UserStageRelation", b =>
                {
                    b.Property<int>("StageId");

                    b.Property<int>("StageRoleId");

                    b.Property<int>("UserId");

                    b.HasKey("StageId", "StageRoleId", "UserId");

                    b.HasIndex("StageId");

                    b.HasIndex("StageRoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserStageRelation");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.UserStudyRelation", b =>
                {
                    b.Property<int>("StudyId");

                    b.Property<int>("UserId");

                    b.Property<bool>("IsAdmin");

                    b.HasKey("StudyId", "UserId");

                    b.HasIndex("StudyId");

                    b.HasIndex("UserId");

                    b.ToTable("UserStudyRelations");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Article", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Study", "Study")
                        .WithMany("Articles")
                        .HasForeignKey("StudyId");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Criteria", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Field", "Field")
                        .WithMany("Criteria")
                        .HasForeignKey("FieldId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Study", "Study")
                        .WithMany("Criteria")
                        .HasForeignKey("StudyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.CriteriaResult", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Article", "Article")
                        .WithOne("CriteriaResult")
                        .HasForeignKey("RecensysCoreRepository.EFRepository.Entities.CriteriaResult", "ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Criteria", "Criteria")
                        .WithMany()
                        .HasForeignKey("CriteriaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Stage", "Stage")
                        .WithMany("CriteriaResults")
                        .HasForeignKey("StageId");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Data", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Article", "Article")
                        .WithMany("Data")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Field", "Field")
                        .WithMany("Data")
                        .HasForeignKey("FieldId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Task", "Task")
                        .WithMany("Data")
                        .HasForeignKey("TaskId");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Field", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Study", "Study")
                        .WithMany("Fields")
                        .HasForeignKey("StudyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Stage", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Study", "Study")
                        .WithMany("Stages")
                        .HasForeignKey("StudyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.StageFieldRelation", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Field", "Field")
                        .WithMany("StageFields")
                        .HasForeignKey("FieldId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Stage", "Stage")
                        .WithMany("StageFields")
                        .HasForeignKey("StageId");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Strategy", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Stage", "Stage")
                        .WithMany("Strategies")
                        .HasForeignKey("StageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.Task", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Stage", "Stage")
                        .WithMany("Tasks")
                        .HasForeignKey("StageId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.User", "User")
                        .WithMany("Tasks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.UserStageRelation", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Stage", "Stage")
                        .WithMany("UserRelations")
                        .HasForeignKey("StageId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.StageRole", "StageRole")
                        .WithMany("UserStageRelations")
                        .HasForeignKey("StageRoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.User", "User")
                        .WithMany("StageRelations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RecensysCoreRepository.EFRepository.Entities.UserStudyRelation", b =>
                {
                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.Study", "Study")
                        .WithMany("UserRelations")
                        .HasForeignKey("StudyId");

                    b.HasOne("RecensysCoreRepository.EFRepository.Entities.User", "User")
                        .WithMany("StudyRelations")
                        .HasForeignKey("UserId");
                });
        }
    }
}

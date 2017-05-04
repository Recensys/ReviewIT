using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using RecensysCoreRepository.EFRepository.Entities;
using Task = RecensysCoreRepository.EFRepository.Entities.Task;

namespace RecensysCoreRepository.EFRepository
{
    /*
     * https://ef.readthedocs.io/en/latest/platforms/netcore/new-db-sqlite.html
     */
    public class RecensysContext : DbContext
    {

        public RecensysContext() {}
        public RecensysContext(DbContextOptions<RecensysContext> options)
            : base(options)
        { }


        public DbSet<Article> Articles { get; set; }
        public DbSet<Criteria> Criterias { get; set; }
        public DbSet<Data> Data { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<StageRole> StageRoles { get; set; }
        public DbSet<Strategy> Strategies { get; set; }
        public DbSet<Study> Studies { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users {get; set; }
        public DbSet<UserStudyRelation> UserStudyRelations { get; set; }
        public DbSet<StageFieldRelation> StageFieldRelations { get; set; }
        public DbSet<CriteriaResult> CriteriaResults { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserStageRelation>()
                .HasKey(a => new {a.StageId, a.StageRoleId, a.UserId});
            modelBuilder.Entity<UserStageRelation>()
                .HasOne(us => us.User)
                .WithMany(u => u.StageRelations)
                .HasForeignKey(pt => pt.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserStageRelation>()
                .HasOne(s => s.Stage)
                .WithMany(st => st.UserRelations)
                .HasForeignKey(pt => pt.StageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserStudyRelation>()
                .HasKey(a => new { a.StudyId, a.UserId });
            modelBuilder.Entity<UserStudyRelation>()
                .HasOne(us => us.User)
                .WithMany(u => u.StudyRelations)
                .HasForeignKey(pt => pt.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserStudyRelation>()
                .HasOne(s => s.Study)
                .WithMany(st => st.UserRelations)
                .HasForeignKey(pt => pt.StudyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Strategy>()
                .HasKey(s => new {s.Id, s.StrategyType, s.StageId});

            modelBuilder.Entity<StageFieldRelation>()
                .HasKey(a => new {a.FieldId, StageFieldType = a.FieldType, a.StageId});
            modelBuilder.Entity<StageFieldRelation>()
                .HasOne(s => s.Field)
                .WithMany(f => f.StageFields)
                .HasForeignKey(pt => pt.FieldId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StageFieldRelation>()
                .HasOne(s => s.Stage)
                .WithMany(st => st.StageFields)
                .HasForeignKey(pt => pt.StageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Criteria>()
                .HasOne(c => c.Field)
                .WithMany(f => f.Criteria)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Article>()
                .HasOne(a => a.Study)
                .WithMany(s => s.Articles)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Task>()
                .HasOne(t => t.Stage)
                .WithMany(a => a.Tasks)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Task>()
                .HasMany(t => t.Data)
                .WithOne(d => d.Task)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Data>()
                .HasOne(d => d.Field)
                .WithMany(f => f.Data)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CriteriaResult>()
                .HasOne(a => a.Stage)
                .WithMany(cr => cr.CriteriaResults)
                .OnDelete(DeleteBehavior.Restrict);

            

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=recensysdb;Trusted_Connection=True;");
            }
        }

        public new DbSet<T> Set<T>() where T : class, IEntity
        {
            return base.Set<T>();
        }

        
    }
}

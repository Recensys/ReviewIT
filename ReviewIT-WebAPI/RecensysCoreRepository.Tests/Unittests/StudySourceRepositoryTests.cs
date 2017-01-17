using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;
using Xunit;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class StudySourceRepositoryTests
    {
        [Fact]
        public void Post_Item_with_AuthorField_Author__Field_added()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StudySourceRepository(context);
            var study = new Study();
            context.Studies.Add(study);
            context.SaveChanges();
            var list = new List<StudySourceItemDTO>()
            {
                new StudySourceItemDTO(StudySourceItemDTO.ItemType.Article, new Dictionary<StudySourceItemDTO.FieldType, string>()
                {
                    {StudySourceItemDTO.FieldType.Author, "Mathias"}
                })
            };

            using (repo)
            {
                repo.Post(study.Id, list);

                var fields = context.Fields.ToList();

                Assert.Equal(1, context.Data.Count(d => d.Value == "Mathias"));
            }
        }

        [Fact]
        public void Post_Data_For_All_Fields_Added()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StudySourceRepository(context);
            context.Studies.Add(new Study() { Id = 1 });
            var list = new List<StudySourceItemDTO>()
            {
                new StudySourceItemDTO(StudySourceItemDTO.ItemType.Article, new Dictionary<StudySourceItemDTO.FieldType, string>()
                {
                    {StudySourceItemDTO.FieldType.Author, "Mathias"}
                })
            };

            using (repo)
            {
                repo.Post(1, list);

                Assert.Equal(36, context.Data.Count());
            }
        }

        [Fact]
        public void Post_All_Fields_Added()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StudySourceRepository(context);
            context.Studies.Add(new Study() { Id = 1 });
            var list = new List<StudySourceItemDTO>()
            {
                new StudySourceItemDTO(StudySourceItemDTO.ItemType.Article, new Dictionary<StudySourceItemDTO.FieldType, string>()
                {
                    {StudySourceItemDTO.FieldType.Author, "Mathias"}
                })
            };

            using (repo)
            {
                repo.Post(1, list);

                Assert.True(context.Data.Count() > 1);
            }
        }

        [Fact]
        public void Post_FieldNameSetCorrectly()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StudySourceRepository(context);
            context.Studies.Add(new Study() { Id = 1 });
            var list = new List<StudySourceItemDTO>()
            {
                new StudySourceItemDTO(StudySourceItemDTO.ItemType.Article, new Dictionary<StudySourceItemDTO.FieldType, string>()
                {
                    {StudySourceItemDTO.FieldType.Author, "Mathias"}
                })
            };

            using (repo)
            {
                repo.Post(1, list);

                Assert.Equal(1, context.Fields.Count(f => f.Name == "Author"));
            }
        }

    }
}

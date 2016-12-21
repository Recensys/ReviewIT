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

                Assert.Equal(1, fields.Count);
            }
        }

        [Fact]
        public void Post_Item_with_AuthorField__Data_Added()
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

                Assert.Equal("Mathias", context.Data.First().Value);
            }
        }

    }
}

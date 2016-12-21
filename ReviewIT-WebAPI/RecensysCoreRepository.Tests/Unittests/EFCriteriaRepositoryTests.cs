using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class EFCriteriaRepositoryTests
    {

        [Fact(DisplayName = "Update() zero stored, one exclusion passed = one exclusion stored")]
        public void Update11()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFCriteriaRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Fields = new List<Field>
                {
                    new Field { Id = 1 }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new CriteriaDTO
            {
                Exclusions = new List<FieldCriteriaDTO> { new FieldCriteriaDTO { Field = new FieldDTO { Id = 1 } } }
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(1, context.Criterias.Count(c => c.Type == CriteriaType.Exclusion));
                Assert.Equal(0, context.Criterias.Count(c => c.Type == CriteriaType.Inclusion));
            }
        }

        [Fact(DisplayName = "Update() one inclusion stored, one exclusion passed = one exclusion stored")]
        public void Update_one_inclusion_stored_one_exclusion_passed__one_exclusion_stored()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFCriteriaRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Criteria = new List<Criteria>
                {
                    new Criteria
                    {
                        Id = 1,
                        Field = new Field { Id = 1 },
                        Type = CriteriaType.Inclusion,
                        
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new CriteriaDTO
            {
                Exclusions = new List<FieldCriteriaDTO> { new FieldCriteriaDTO {Field = new FieldDTO {Id = 1 } } }
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(1, context.Criterias.Count(c => c.Type == CriteriaType.Exclusion));
                Assert.Equal(0, context.Criterias.Count(c => c.Type == CriteriaType.Inclusion));
            }
        }

        [Fact(DisplayName = "Update() one stored, zero given = zero stored")]
        public void Update2()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFCriteriaRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Criteria = new List<Criteria>
                {
                    new Criteria
                    {
                        Id = 1,
                        Field = new Field { },
                        Type = CriteriaType.Exclusion,

                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new CriteriaDTO
            {
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(0, context.Criterias.Count(c => c.Type == CriteriaType.Exclusion));
                Assert.Equal(0, context.Criterias.Count(c => c.Type == CriteriaType.Inclusion));
            }
        }

        [Fact(DisplayName = "Update() one inclusion stored and passed")]
        public void Update1()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFCriteriaRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Criteria = new List<Criteria>
                {
                    new Criteria
                    {
                        Id = 1,
                        Field = new Field { },
                        Type = CriteriaType.Exclusion,

                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new CriteriaDTO
            {
                Exclusions = new List<FieldCriteriaDTO> { new FieldCriteriaDTO { Id = 1, Field = new FieldDTO() } },
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(1, context.Criterias.Count(c => c.Id == 1));
            }
        }
    }
}

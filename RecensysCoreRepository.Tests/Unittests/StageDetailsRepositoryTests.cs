using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class StageDetailsRepositoryTests
    {
        [Fact]
        public void Create_passed_empty_dto__returns_id()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO();

            using (repo)
            {
                var r = repo.Create(1, dto);

                Assert.Equal(1, r);
            }
        }

        [Fact]
        public void Create_passed_empty_dto_one_stage_stored__returns_id_2()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage()
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO();

            using (repo)
            {
                var r = repo.Create(1, dto);

                Assert.Equal(2, r);
            }
        }

        //[Fact]
        //public void Create_oneFieldInStudy__fieldSetAsAvailableInNewStage()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new StageDetailsRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Fields = new List<Field>
        //        {
        //            new Field
        //            {
        //                Id = 1
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    var dto = new StageDetailsDTO();

        //    using (repo)
        //    {
        //        var r = repo.Create(1, dto);

        //        Assert.Equal(FieldType.Available, context.Stages.Single(s => s.Id == r).StageFields.Single(sf => sf.FieldId == 1).FieldType);
        //    }
        //}

        [Fact]
        public void Read_stage_with_Id_2_stored__dto_returned()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage {Id = 2}
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO();

            using (repo)
            {
                var r = repo.Read(2);

                Assert.Equal(2, r.Id);
            }
        }

        [Fact]
        public void Read_stage_with_name_and_description__dto_with_name_and_description()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage {Id = 2, Name = "Name", Description = "Description"}
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO();

            using (repo)
            {
                var r = repo.Read(2);

                Assert.Equal("Name", r.Name);
                Assert.Equal("Description", r.Description);
            }
        }

        [Fact]
        public void Update_stored_stage_with_no_name__stage_name_set()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage {Id = 2, Name = "", Description = "Description"}
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO {Id = 2, Name = "Name"};

            using (repo)
            {
                var r = repo.Update(dto);

                Assert.Equal("Name", context.Stages.Single(s => s.Id == 2).Name);
            }
        }

        [Fact]
        public void GetAll_2_stored__returns_2()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage {Id = 1, Name = "", Description = "Description"},
                    new Stage {Id = 2, Name = "", Description = "Description"},
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageDetailsDTO { Id = 2, Name = "Name" };

            using (repo)
            {
                var r = repo.GetAll(1);

                Assert.Equal(2, r.Count);
            }
        }

        [Fact(DisplayName = "TryGetNextStage() only stage returns false")]
        public void TryGetNextStage()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var studies = new List<Study>
            {
                new Study
                {
                    Id = 1,
                    Stages = new List<Stage>
                    {
                        new Stage {Id = 1, StudyId = 1}
                    }
                }
            };
            #endregion
            context.Studies.AddRange(studies);
            context.SaveChanges();

            int nextStageId;
            int current = 1;

            var result = repo.TryGetNextStage(current, out nextStageId);

            Assert.False(result);
        }

        [Fact(DisplayName = "TryGetNextStage() two stages given first stage return true")]
        public void TryGetNextStage2()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var studies = new List<Study>
            {
                new Study
                {
                    Id = 1,
                    Stages = new List<Stage>
                    {
                        new Stage {Id = 1, StudyId = 1},
                        new Stage {Id = 2, StudyId = 1}
                    }
                }
            };
            #endregion
            context.Studies.AddRange(studies);
            context.SaveChanges();

            int nextStageId;
            int current = 1;

            var result = repo.TryGetNextStage(current, out nextStageId);

            Assert.True(result);
        }

        [Fact(DisplayName = "TryGetNextStage() stages with id 1 and 2, given stage 1 returns 2")]
        public void TryGetNextStage3()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageDetailsRepository(context);
            #region model
            var studies = new List<Study>
            {
                new Study
                {
                    Id = 1,
                    Stages = new List<Stage>
                    {
                        new Stage {Id = 1, StudyId = 1},
                        new Stage {Id = 2, StudyId = 1}
                    }
                }
            };
            #endregion
            context.Studies.AddRange(studies);
            context.SaveChanges();

            int nextStageId;
            int current = 1;

            var result = repo.TryGetNextStage(current, out nextStageId);

            Assert.Equal(2, nextStageId);
        }
    }
}

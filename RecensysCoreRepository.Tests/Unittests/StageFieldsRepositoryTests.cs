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
    public class StageFieldsRepositoryTests
    {
        [Fact]
        public void Get_one_available_field_stored__one_available_field_returned()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Fields = new List<Field> { new Field() },
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();

            using (repo)
            {
                var r = repo.Get(1);

                Assert.Equal(1, r.AvailableFields.Count);
            }
        }

        [Fact]
        public void Get_one_visible_field_stored__one_visible_field_returned()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        StageFields = new List<StageFieldRelation>
                        {
                            new StageFieldRelation
                            {
                                FieldType = FieldType.Visible,
                                Field = new Field()
                            }
                        }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();

            using (repo)
            {
                var r = repo.Get(1);

                Assert.Equal(1, r.VisibleFields.Count);
            }
        }

        [Fact]
        public void Get_one_requested_field_stored__one_requested_field_returned()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        StageFields = new List<StageFieldRelation>
                        {
                            new StageFieldRelation
                            {
                                FieldType = FieldType.Requested,
                                Field = new Field()
                            }
                        }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();

            using (repo)
            {
                var r = repo.Get(1);

                Assert.Equal(1, r.RequestedFields.Count);
            }
        }

        [Fact]
        public void Update_one_visible_passed_none_stored__one_visible_stored()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageFieldsDTO()
            {
                VisibleFields = new List<FieldDTO>
                {
                    new FieldDTO()
                }
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(1, context.StageFieldRelations.Count(sf => sf.FieldType == FieldType.Visible));
            }
        }

        [Fact]
        public void Update_one_visible_passed_one_requested_stored__one_visible_stored()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        StageFields = new List<StageFieldRelation>
                        {
                            new StageFieldRelation {FieldType = FieldType.Requested, Field = new Field()}
                        }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            var dto = new StageFieldsDTO()
            {
                VisibleFields = new List<FieldDTO>
                {
                    new FieldDTO()
                }
            };

            using (repo)
            {
                var r = repo.Update(1, dto);

                Assert.Equal(1, context.StageFieldRelations.Count(sf => sf.FieldType == FieldType.Visible));
                Assert.Equal(0, context.StageFieldRelations.Count(sf => sf.FieldType == FieldType.Requested));
            }
        }


        [Fact]
        public void Get_AvailableFieldStoredForOtherStudy__None()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new StageFieldsRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Fields = new List<Field> { new Field() },
                
            };
            var study2 = new Study
            {
                Id = 2
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();

            using (repo)
            {
                var r = repo.Get(2);

                Assert.Equal(0, r.AvailableFields.Count);
            }
        }
    }
}

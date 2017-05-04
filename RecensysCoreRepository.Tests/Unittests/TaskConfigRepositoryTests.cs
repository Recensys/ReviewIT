using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;
using FieldType = RecensysCoreRepository.DTOs.FieldType;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class TaskConfigRepositoryTests
    {

        [Fact]
        public void Create_1ArticleWith1Field__1task()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean,
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 1,
                                            Value = "d1",
                                            Article = new Article
                                            {
                                                Id = 2,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            

            using (repo)
            {
                var r = repo.Create(1, 2, 1, new[] {1});

                Assert.Equal(1, context.Tasks.Count());
            }

        }


        [Fact]
        public void Create_1ArticleWith2Field__1task()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean,
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 1,
                                            Value = "d1",
                                            Article = new Article
                                            {
                                                Id = 2,
                                            }
                                        }
                                    }
                                }
                            },
                            new StageFieldRelation
                            {
                                FieldType = FieldType.Requested,
                                Field = new Field
                                {
                                    Id = 2,
                                    DataType = DataType.String,
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 2,
                                            Value = "d2",
                                            ArticleId = 2
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            

            using (repo)
            {
                var r = repo.Create(1, 2, 1, new []{1,2});

                Assert.Equal(1, context.Tasks.Count());
            }
        }


        [Fact]
        public void Create_1ArticleWith2FieldsWithNoData__1TaskWith2NewData()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean
                                }
                            },
                            new StageFieldRelation
                            {
                                FieldType = FieldType.Requested,
                                Field = new Field
                                {
                                    Id = 2,
                                    DataType = DataType.String,
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();
            

            using (repo)
            {
                var r = repo.Create(1, 2, 1, new []{1,2});

                var t = context.Tasks.Single(ta => ta.Id == r);

                Assert.Equal(2, t.Data.Count);

            }

        }

        [Fact]
        public void Create_1ArticleWith1FieldsWithNoData__1TaskWith1NewEmptyData()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();


            using (repo)
            {
                var r = repo.Create(1, 2, 1, new[] { 1 });

                var t = context.Tasks.Single(ta => ta.Id == r);

                Assert.Equal("", t.Data.Single().Value);

            }

        }


        [Fact]
        public void Create_1ArticleWith2FieldsOneOfWhichWithNoData__1TaskWith2Fields()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean,
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Value = "true",
                                            Article = new Article
                                            {
                                                Id = 2
                                            }
                                        },
                                    }
                                }
                            },
                            new StageFieldRelation
                            {
                                FieldType = FieldType.Requested,
                                Field = new Field
                                {
                                    Id = 2,
                                    DataType = DataType.Boolean
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();


            using (repo)
            {
                var r = repo.Create(1, 2, 1, new[] { 1, 2 });

                var t = context.Tasks.Single(ta => ta.Id == r);

                Assert.Equal(1, t.Data.Count(d => d.Value == "true"));
                Assert.Equal(1, t.Data.Count(d => d.Value == ""));
            }

        }


        [Fact]
        public void Create_1ArticleWith1VisibleField__VisDataPointsToTask()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new TaskConfigRepository(context);
            #region model
            var study = new Study
            {
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
                                Field = new Field
                                {
                                    Id = 1,
                                    DataType = DataType.Boolean,
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 1,
                                            Value = "true",
                                            Article = new Article
                                            {
                                                Id = 2
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User { Id = 1 }
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            context.SaveChanges();


            using (repo)
            {
                var r = repo.Create(1, 2, 1, new[] { 1 });
                
                Assert.Equal(r, context.Data.Single(da => da.Id == 1).TaskId);
            }

        }

    }
}
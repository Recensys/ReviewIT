using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class ReviewTaskRepositoryTests
    {


        [Fact]
        public void GetListDto_1taskWith1Data_1ReviewTask()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User {Id = 1},
                                Data = new List<Data>
                                {
                                    new Data
                                    {
                                        Id = 1,
                                        Field = new Field
                                        {
                                            DataType = DataType.Boolean,
                                            StageFields = new List<StageFieldRelation>
                                            {
                                                new StageFieldRelation
                                                {
                                                    FieldType = FieldType.Visible
                                                }
                                            }
                                        }
                                    }
                                }
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
                var r = repo.GetListDto(1, 1);

                Assert.Equal(1, r.Tasks.Count);
            }
        }

        [Fact]
        public void GetListDto__DoNotGetUnrelatedData()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User {Id = 1},
                                Data = new List<Data>
                                {
                                    new Data
                                    {
                                        Id = 1,
                                        Field = new Field
                                        {
                                            DataType = DataType.Boolean,
                                            StageFields = new List<StageFieldRelation>
                                            {
                                                new StageFieldRelation
                                                {
                                                    FieldType = FieldType.Visible
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        CriteriaResults = new List<CriteriaResult>
                        {
                            new CriteriaResult
                            {
                                Article = new Article
                                {
                                    Data = new List<Data>
                                    {
                                        new Data {Id = 2},
                                        new Data {Id = 3},
                                        new Data {Id = 4},
                                    }
                                }
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
                var r = repo.GetListDto(1, 1);

                var t = r.Tasks.Single(ta => ta.Id == 1);

                Assert.Equal(1, t.Data.Count);
            }
        }

        

        [Fact]
        public void GetListDto_twoFieldsStoredInOrder__FieldsReturnedInOrder()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
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
                            new StageFieldRelation{
                                Field = new Field
                                {
                                    Id = 1,
                                    Name = "Title",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 2,
                                            ArticleId = 1,
                                            Value = "title"
                                        }
                                    },
                                },
                                FieldType = FieldType.Visible
                            },
                            new StageFieldRelation
                            {
                                Field = new Field
                                {
                                    Id = 2,
                                    Name = "isGSD?",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                             Id = 1,
                                             Value = "empty"
                                        }
                                    }
                                },
                                FieldType = FieldType.Requested
                            },
                        },
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
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
                var r = repo.GetListDto(1, 1);

                var fields = r.Fields.ToArray();
                var data = r.Tasks.First().Data.ToArray();

                Assert.Equal("Title", fields[0].Name);
                Assert.Equal("isGSD?", fields[1].Name);
            }
        }

        [Fact]
        public void GetListDto_twoFieldsStoredUnordered__FieldsReturnedInOrder()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
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
                            new StageFieldRelation{
                                Field = new Field
                                {
                                    Id = 2,
                                    Name = "Title",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 2,
                                            ArticleId = 1,
                                            Value = "title"
                                        }
                                    },
                                },
                                FieldType = FieldType.Visible
                            },
                            new StageFieldRelation
                            {
                                Field = new Field
                                {
                                    Id = 1,
                                    Name = "isGSD?",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                             Id = 1,
                                             Value = "empty"
                                        }
                                    }
                                },
                                FieldType = FieldType.Requested
                            },
                        },
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
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
                var r = repo.GetListDto(1, 1);

                var fields = r.Fields.ToArray();
                var data = r.Tasks.First().Data.ToArray();

                Assert.Equal("isGSD?", fields[0].Name);
                Assert.Equal("Title", fields[1].Name);
            }
        }


        [Fact]
        public void GetListDto_twoDataStoredInOrder__DataReturnedInOrder()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
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
                            new StageFieldRelation{
                                Field = new Field
                                {
                                    Id = 1,
                                    Name = "Title",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 1,
                                            Value = "title",
                                            TaskId = 1
                                        }
                                    },
                                },
                                FieldType = FieldType.Visible
                            },
                            new StageFieldRelation
                            {
                                Field = new Field
                                {
                                    Id = 2,
                                    Name = "isGSD?",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                             Id = 2,
                                             Value = "empty",
                                             TaskId = 1
                                        }
                                    }
                                },
                                FieldType = FieldType.Requested
                            },
                        },
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
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
                var r = repo.GetListDto(1, 1);

                var fields = r.Fields.ToArray();
                var data = r.Tasks.First().Data.ToArray();

                Assert.Equal("title", data[0].Value);
                Assert.Equal("empty", data[1].Value);
            }
        }


        [Fact]
        public void GetListDto_twoDataStoredUnordered__DataReturnedInOrder()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
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
                            new StageFieldRelation{
                                Field = new Field
                                {
                                    Id = 1,
                                    Name = "Title",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                            Id = 2,
                                            Value = "title",
                                            TaskId = 1
                                        }
                                    },
                                },
                                FieldType = FieldType.Visible
                            },
                            new StageFieldRelation
                            {
                                Field = new Field
                                {
                                    Id = 2,
                                    Name = "isGSD?",
                                    Data = new List<Data>
                                    {
                                        new Data
                                        {
                                             Id = 1,
                                             Value = "empty",
                                             TaskId = 1
                                        }
                                    }
                                },
                                FieldType = FieldType.Requested
                            },
                        },
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
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
                var r = repo.GetListDto(1, 1);

                var fields = r.Fields.ToArray();
                var data = r.Tasks.First().Data.ToArray();

                Assert.Equal("title", data[0].Value);
                Assert.Equal("empty", data[1].Value);
            }
        }

        [Fact]
        public void CountIncomplete()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskState = TaskState.InProgress,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
                            },
                            new Task
                            {
                                Id = 2,
                                TaskState = TaskState.InProgress,
                                TaskType = TaskType.Review,
                                User = new User { Id = 2 }
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
                var r = repo.CountIncomplete(1);


                Assert.Equal(2, r);
            }
        }


        [Fact]
        public void SetState()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new ReviewTaskRepository(context);
            #region model
            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Id = 1,
                        Tasks = new List<Task>
                        {
                            new Task
                            {
                                Id = 1,
                                TaskState = TaskState.InProgress,
                                TaskType = TaskType.Review,
                                User = new User { Id = 1 }
                            },
                            new Task
                            {
                                Id = 2,
                                TaskState = TaskState.InProgress,
                                TaskType = TaskType.Review,
                                User = new User { Id = 2 }
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
                var r = repo.CountIncomplete(1);
                Assert.Equal(2, r);

                repo.SetState(1, TaskState.Done);
                var r2 = repo.CountIncomplete(1);

                Assert.Equal(1, r2);
            }
        }

    }
}
using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;
using Task = System.Threading.Tasks.Task;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class EFOVerviewRepositoryTests
    {

        [Fact(DisplayName = "Read() One stage with name S1 stored")]
        public async Task Test1()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Name = "S1"
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();
            

            
            var r = await repo.ReadAsync(1);

            Assert.Equal(1, r.Stages.Count(s => s.Name == "S1"));
        }

        [Fact(DisplayName = "Read() One user in study = one usertask")]
        public async Task Test2()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();



            var r = await repo.ReadAsync(1);

            Assert.Equal(1, r.UserTasks.Count);
        }


        [Fact(DisplayName = "Read() One user with one task in first stage = one task")]
        public async Task Test3()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Name = "S1",
                        Tasks = new List<EFRepository.Entities.Task>
                        {
                            new EFRepository.Entities.Task
                            {
                                TaskState = TaskState.New,
                                User = new User
                                {
                                    Id = 1
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);
            var ut = r.UserTasks[0];
            var firstStageProgress = ut.Progress[0];

            Assert.Equal(1, firstStageProgress.TotalTasks);
        }

        [Fact(DisplayName = "Read() One user with one done task in first stage = one done task")]
        public async Task Test4()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Name = "S1",
                        Tasks = new List<EFRepository.Entities.Task>
                        {
                            new EFRepository.Entities.Task
                            {
                                TaskState = TaskState.Done,
                                User = new User
                                {
                                    Id = 1
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);
            var ut = r.UserTasks[0];
            var firstStageProgress = ut.Progress[0];

            Assert.Equal(1, firstStageProgress.DoneTasks);
        }


        [Fact(DisplayName = "Read() two users = two usertasks")]
        public async Task Test5()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    },
                    new UserStudyRelation
                    {
                        User = new User {Id = 2}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);

            Assert.Equal(2, r.UserTasks.Count);
        }


        [Fact(DisplayName = "Read() two users with one task each = two usertasks with one task each")]
        public async Task Test6()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Name = "S1",
                        Tasks = new List<EFRepository.Entities.Task>
                        {
                            new EFRepository.Entities.Task
                            {
                                TaskState = TaskState.Done,
                                User = new User
                                {
                                    Id = 1
                                }
                            },
                            new EFRepository.Entities.Task
                            {
                                TaskState = TaskState.Done,
                                User = new User
                                {
                                    Id = 2
                                }
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    },
                    new UserStudyRelation
                    {
                        User = new User {Id = 2}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);
            var ut1 = r.UserTasks[0];
            var ut1t = ut1.Progress[0];
            var ut2 = r.UserTasks[1];
            var ut2t = ut2.Progress[0];

            Assert.Equal(1, ut1t.TotalTasks);
            Assert.Equal(1, ut2t.TotalTasks);
        }


        [Fact(DisplayName = "Read() one stage with one user without any tasks = userTasks zero")]
        public async Task Test7()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Name = "S1"
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);
            var ut1 = r.UserTasks[0];
            var ut1t = ut1.Progress[0];

            Assert.Equal(0, ut1t.TotalTasks);
        }


        [Fact(DisplayName = "Read() two stages, one user with 1 task in both stages")]
        public async Task Test8()
        {
            var options = Helpers.CreateInMemoryOptions();
            var context = new RecensysContext(options);
            var repo = new EFOverviewRepository(context);
            #region model

            var study = new Study
            {
                Id = 1,
                Stages = new List<Stage>
                {
                    new Stage
                    {
                        Tasks = new List<EFRepository.Entities.Task>
                        {
                            new EFRepository.Entities.Task
                            {
                                UserId = 1
                            }
                        }
                    },
                    new Stage
                    {
                        Tasks = new List<EFRepository.Entities.Task>
                        {
                            new EFRepository.Entities.Task
                            {
                                UserId = 1
                            }
                        }
                    }
                },
                UserRelations = new List<UserStudyRelation>
                {
                    new UserStudyRelation
                    {
                        User = new User {Id = 1}
                    }
                }
            };
            #endregion
            context.Studies.Add(study);
            await context.SaveChangesAsync();

            var r = await repo.ReadAsync(1);
            var ut = r.UserTasks[0];

            Assert.Equal(2, ut.Progress.Count);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using RecensysCoreRepository;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;
using Swashbuckle.Swagger.Model;
using RecensysCoreBLL;
using RecensysCoreBLL.CriteriaEngine;
using RecensysCoreBLL.CriteriaEngine.Evaluators;

namespace RecensysCoreWebAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddScoped<IDistributionRepository, DistributionRepository>();
            services.AddScoped<IStudyMemberRepository, StudyMemberRepository>();
            services.AddScoped<IUserDetailsRepository, UserDetailsRepository>();
            services.AddScoped<IStudyDetailsRepository, StudyDetailsRepository>();
            services.AddScoped<IDistributionRepository, DistributionRepository>();
            services.AddScoped<IStageFieldsRepository, StageFieldsRepository>();
            services.AddScoped<IStudySourceRepository, StudySourceRepository>();
            services.AddScoped<IStageDetailsRepository, StageDetailsRepository>();
            services.AddScoped<IFieldRepository, FieldRepository>();
            services.AddScoped<ICriteriaRepository, EFCriteriaRepository>();
            services.AddScoped<ITaskDistributionEngine, TaskDistributionEngine>();
            services.AddScoped<ITaskConfigRepository, TaskConfigRepository>();
            services.AddScoped<IArticleRepository, EFArticleRepository>();
            services.AddScoped<IStageStartEngine, StageStartEngine>();
            services.AddScoped<IStudyStartEngine, StudyStartEngine>();
            services.AddScoped<IPostStageEngine, PostStageEngine>();
            services.AddScoped<IReviewTaskRepository, ReviewTaskRepository>();
            services.AddScoped<IReviewTaskLogic, ReviewTaskLogic>();
            services.AddScoped<IDataRepository, EFDataRepository>();
            services.AddScoped<ICriteriaEngine, CriteriaEngine>();
            services.AddScoped<IResourceRepository, EFResourceRepository>();
            services.AddScoped<IOverviewRepository, EFOverviewRepository>();

            services.AddCors();

            services.AddSwaggerGen();
            services.ConfigureSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "ReviewIT API"
                });
                //Determine base path for the application.
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                //Set the comments path for the swagger json and ui.
                options.IncludeXmlComments(basePath + "\\RecensysCoreWebAPI.xml");
            });

            services.AddMvc().AddJsonOptions(options =>
            {
                //keeps camel case on json parsing
                options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
            });


            /**
             *  Setup blob storage
             */

            var blockBlob = ConfigureCloudBlockBlob();
            services.AddSingleton(blockBlob);

            var conStr = Configuration["ConnectionStrings:db"];
            //string azureDbPass = Configuration["azureDbPass"];
            //services.AddDbContext<RecensysContext>(options => options.UseSqlServer(@"Server=tcp:recensysdb.database.windows.net,1433;Initial Catalog=recensys;Persist Security Info=False;User ID=mkin;Password="+azureDbPass+@";MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));
            services.AddDbContext<RecensysContext>(options => options.UseSqlServer(conStr));
        }


        private CloudBlobContainer ConfigureCloudBlockBlob()
        {
            string blobConnectionString = Configuration["ConnectionStrings:blob"];
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(blobConnectionString);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference("resources");

            // Create the container if it doesn't already exist.
            container.CreateIfNotExistsAsync();

            return container;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseDeveloperExceptionPage();

            // TODO set correct allowed origins for deployment
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseSwagger();
            app.UseSwaggerUi();

            app.UseMvc();
        }
    }
}

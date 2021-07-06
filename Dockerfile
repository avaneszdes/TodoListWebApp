#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update; \
    apt-get install -y curl gnupg; \
    curl -sL https://deb.nodesource.com/setup_10.x | bash -; \
    apt-get install -y nodejs; \
    rm -rf /var/lib/apt/lists/*

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update; \
    apt-get install -y curl gnupg; \
    curl -sL https://deb.nodesource.com/setup_10.x | bash -; \
    apt-get install -y nodejs; \
    rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["src/TodoListWebApp/TodoListWebApp.csproj", "TodoListWebApp/"]
COPY ["src/NUnitAutoTests/NUnitAutoTests.csproj", "NUnitAutoTests/"]
COPY ["src/ApplicationContext/ApplicationContext.csproj", "ApplicationContext/"]
COPY ["src/Entities/Entities.csproj", "Entities/"]
COPY ["src/Services/Services.csproj", "Services/"]
COPY ["src/Repositories/Repositories.csproj", "Repositories/"]
RUN dotnet restore "TodoListWebApp/TodoListWebApp.csproj"
COPY src/ .
WORKDIR "/src/TodoListWebApp"
RUN dotnet build "TodoListWebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoListWebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListWebApp.dll"]
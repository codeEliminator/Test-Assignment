
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["sevrer/sevrer.csproj", "sevrer/"]
RUN dotnet restore "sevrer/sevrer.csproj"
COPY . .
WORKDIR "/src/sevrer"
RUN dotnet build "sevrer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sevrer.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sevrer.dll"]

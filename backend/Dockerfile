# syntax=docker/dockerfile:1

# Build Stage

FROM eclipse-temurin:21-jdk AS build
WORKDIR /dms
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Run Stage

FROM eclipse-temurin:21-jre
WORKDIR /dms
COPY --from=build /dms/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Enum.Clear();

            foreach (var name in Enum.GetNames(context.Type))
            {
                var member = context.Type.GetMember(name).First();

                var description = member.GetCustomAttribute<DescriptionAttribute>()?.Description ?? name;

                schema.Enum.Add(new OpenApiString(description));
            }
        }
    }
}

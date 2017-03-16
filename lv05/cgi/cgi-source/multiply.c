#include <stdio.h>
#include <stdlib.h>
int main(void)
{
    char *data;
    double m,n;

    printf("Content-type: text/html\n\n");
    printf("<html><head><title>Multiply</title></head><body><br>");

    printf("<h3>Multiplication results</h3><br>");
    data = getenv("QUERY_STRING");
    if(data == NULL)
        printf("<p>Error! Error in passing data from form to script.</p>");
    else if(sscanf(data,"m=%lf&n=%lf",&m,&n)!=2)
        printf("<p>Error! Invalid data. Data must be numeric.</p>");
    else
        printf("<p>The product of %lf and %lf is %lf.</p>",m,n,m*n);
    return 0;
}

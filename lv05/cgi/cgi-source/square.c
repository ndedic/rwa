#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
extern char ** environ;

int main(int argc, char *argv[])
{
    int i=0;
    char * lenstr = getenv("CONTENT_LENGTH");
    int len = atoi(lenstr);
    char * postdata; 

    printf("Content-type: text/html\n\n");
    printf("<html><head><title>Square</title></head><body><br>");

    printf("<h3>Square result</h3><br>");

    postdata = (char *) malloc(len + 1);

    if (!postdata) { /* handle error or */ exit(EXIT_FAILURE);  }
    
    fgets(postdata, len + 1, stdin);

    double num;  
    if(sscanf(postdata,"num=%lf",&num) != 1)
    {
        printf("Input is not valid!<br>");
    }
    else{
        printf("Number is <b>%lf</b> and square of that number is <b>%lf</b>!", num, num*num);
    }

    free(postdata);

    printf("</body></html>\n");
    return 0;
}

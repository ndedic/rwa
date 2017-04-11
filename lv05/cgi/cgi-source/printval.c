#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
extern char ** environ;

/* POST parametri se uzimaju sa stdin */
int main(int argc, char *argv[])
{
  int i=0;
  char * lenstr = getenv("CONTENT_LENGTH");
  int len = atoi(lenstr);
  char * postdata; 

  printf("Content-type: text/html\n\n");
  printf("<html><head><title>Environment</title></head><body>\n");

  printf("Env variable REQUEST_METHOD is: %s<br>\n", getenv("REQUEST_METHOD"));
  printf("Env variable QUERY_STRING is: %s<br>\n", getenv("QUERY_STRING"));

  postdata = (char *) malloc(len + 1);

  if (!postdata) { /* handle error or */ exit(EXIT_FAILURE);  }
  fgets(postdata, len + 1, stdin);
  printf("Post data: %s<br>\n", postdata);

  free(postdata);

  printf("</body></html>\n");
  return 0;
}

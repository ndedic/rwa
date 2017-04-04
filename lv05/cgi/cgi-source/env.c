#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
extern char ** environ;

int main(int argc, char *argv[])
{
  char **  env = environ;
  printf("Content-type: text/html\n\n");

  printf("<html><head><title>Environment</title></head><body>\n");
  while(*env != NULL) 
  {
    char * envvar = *env;
    printf("%s<br>\n", envvar);
    env++;
  }
  
  printf("<b>upit</b>: %s\n", getenv("QUERY_STRING"));
  printf("</body></html>\n");
  return 0;
}

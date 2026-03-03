#include <stdio.h>
#include <stdlib.h>
#include <string.h>


inline int ishex(int x)
{
	return	(x >= '0' && x <= '9')	||
		(x >= 'a' && x <= 'f')	||
		(x >= 'A' && x <= 'F');
}
 
int decode(const char *s, char *dec)
{
	char *o;
	const char *end = s + strlen(s);
	int c;
 
	for (o = dec; s <= end; o++) {
		c = *s++;
		if (c == '+') c = ' ';
		else if (c == '%' && (	!ishex(*s++) ||	!ishex(*s++) || !sscanf(s - 2, "%2x", &c)) )
			return -1;
 
		if (dec) *o = c;
	}
 
	return o - dec;
}

int main(void)
{
    char *data;
    double m,n;
    char o;

    printf("Content-type: text/html\n\n");
    printf("<html><head><title>Calculator</title></head><body><br>");

    printf("<h3>Calculate results</h3><br>");
    data = getenv("QUERY_STRING");
    
    
   
    if(data == NULL)
        printf("<p>Error! Error in passing data from form to script.</p>");
    else    
    {
      char out[strlen(data) + 1];
      if(decode(data, out) < 0)
      {
        printf("<p>Error! Error in passing data from form to script.</p>");
      }
      else
      {
        if(sscanf(out,"m=%lf&o=%c&n=%lf", &m, &o, &n)!=3)
            printf("<p>Error! Invalid data.</p>");
        else    
        {            
            switch(o)
            {
                case '+':
                    printf("<p>The sum of %lf and %lf is %lf.</p>",m,n,m+n);
                    break;
                case '-':
                    printf("<p>The difference of %lf and %lf is %lf.</p>",m,n,m-n);
                    break;   
               case '/':
                    if(n==0)
                    {
                        printf("<p>The divider must not be zero.</p>");
                    }
                    else
                    {
                        printf("<p>The ratio of %lf and %lf is %lf.</p>",m,n,m/n);
                    }
                    break;
               case '*':
                   printf("<p>The product of %lf and %lf is %lf.</p>",m,n,m*n);
                   break;
            }
        }
      }
    }
    
    return 0;
}

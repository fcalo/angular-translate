
import sys, re

print 'Usage : "python default_lang.py [fichero_lang] [prefijo]'
print '\t python default_lang.py app/languajes/es.json '
print '\t python default_lang.py app/languajes/en.json EN_'

f = open(sys.argv[1],"r")
prefix = "" if len(sys.argv) < 3 else sys.argv[2]

output = ""
lines = f.readlines()
for line in lines:
  if '"' in line:
    output += line.replace('""', '"%s%s"' % (prefix, re.findall(".*\\\"(.*)\\\":.*", line)[0]))
  else:
    output += line
  
  
f.close()
f = open(sys.argv[1],"w")
f.write(output)
f.close()
print "Generado."
